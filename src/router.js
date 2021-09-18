import {createRouter, createWebHistory} from "vue-router"
import Light from "./components/Light"

const routes = [
  { path: "/", redirect: "/red" },
  { path: "/red", component: Light },
  { path: "/yellow", component: Light },
  { path: "/green", component: Light }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})
