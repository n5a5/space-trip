import { NodeIO } from '@gltf-transform/core';
import { weld, dedup, prune, join, flatten, meshopt } from '@gltf-transform/functions';
import { MeshoptSimplifier, MeshoptEncoder } from 'meshoptimizer';
const io = new NodeIO().registerExtensions((await import('@gltf-transform/extensions')).ALL_EXTENSIONS).registerDependencies({ 'meshopt.encoder': MeshoptEncoder });
await MeshoptSimplifier.ready;
const doc = await io.read('glb2/t0.glb'); const target = +process.argv[2] || 60000;
for (const m of doc.getRoot().listMeshes()) for (const p of m.listPrimitives()) for (const s of p.listSemantics()) if (s !== 'POSITION') p.setAttribute(s, null);
await doc.transform(dedup(), flatten(), join(), weld({ tolerance: 0.0001 }));
let tot = 0; const prims = []; for (const m of doc.getRoot().listMeshes()) for (const p of m.listPrimitives()) { prims.push(p); tot += p.getIndices().getCount() / 3; }
for (const p of prims) {
  const idx = new Uint32Array(p.getIndices().getArray()), pos = new Float32Array(p.getAttribute('POSITION').getArray());
  const want = Math.max(3, Math.floor(idx.length / 3 * target / tot) * 3);
  const [out, err] = MeshoptSimplifier.simplifySloppy(idx, pos, 3, null, want, 0.01);
  p.getIndices().setArray(out); console.log('prim', idx.length / 3, '->', out.length / 3, 'err', err.toFixed(4));
}
await doc.transform(prune(), meshopt({ encoder: MeshoptEncoder, level: 'medium' })); await io.write('glb2/taj.glb', doc);
