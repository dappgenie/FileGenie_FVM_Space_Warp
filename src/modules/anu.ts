import { anu } from 'anu-vue'
import { type UserModule } from '~/types'
// anu styles
import 'anu-vue/dist/style.css'
// default theme styles
import '@anu-vue/preset-theme-default/dist/style.css'

export const install: UserModule = ({ app }) => {
  app.use(anu)
}
