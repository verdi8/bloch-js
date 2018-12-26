// import de nos plugins
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import * as meta from "./package.json";

export default {
    input: 'src/main.js',
    output: {
        name: 'bloch',
        file: 'dist/bloch.js',
        format: 'umd'
        // globals: {
        //     'd3' : 'd3'
        // }
    },
    // external: ['d3'],
    plugins: [
        commonjs(
            {
                // explicitly specify unresolvable named exports
                // (see below for more details)
                namedExports: {'node_modules/mathjs/index.js': ['PI', 'min']},  // Default: undefined
            }

        ), // prise en charge de require
        resolve(), // prise en charge des modules depuis node_modules
        babel({
            exclude: 'node_modules/**'
        }) // transpilation
        // terser() // minification
    ]
};
