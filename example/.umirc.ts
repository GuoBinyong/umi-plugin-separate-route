import { defineConfig } from 'umi';
export default defineConfig({
  plugins: [require.resolve('../')],
  separateRoute:{
    fileName:"route"
  }
});
