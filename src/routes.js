import VueRouter from 'vue-router'

const MirrorError = resolve => require(['containers/MirrorError'], resolve)
const PathPass = resolve => require(['containers/PathPass'], resolve)

const routes = [
  { path: '/mirror-error', component: MirrorError },
  { path: '/path-pass', component: PathPass }
]

export default new VueRouter({ routes })
