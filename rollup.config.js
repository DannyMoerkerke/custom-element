import minify from 'rollup-plugin-babel-minify';

export default {
    input: 'src/custom-element.js',
    plugins: [minify()],
    output: [
        {
            file: 'dist/custom-element.js',
            format: 'iife',
            name: 'CustomElement'
        },
        {
            file: 'dist/custom-element.es.js',
            format: 'es'
        },
        {
            file: 'dist/custom-element.umd.js',
            format: 'umd',
            name: 'CustomElement'
        }
    ]
}
