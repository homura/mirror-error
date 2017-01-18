import VueRouter from 'vue-router'

const MirrorError = resolve => require(['containers/MirrorError'], resolve)

const routes = [
  { path: '/mirror-error', component: MirrorError }
]

export default new VueRouter({ routes })
