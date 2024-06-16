precision mediump float;

uniform float uTime;
uniform vec2 uKrakenPos;
uniform sampler2D uOceanTexture;

varying vec2 vUv;

const vec2 center = vec2(0.5, 0.5);

const float repeat = 7.;

void main() {
    vec2 uv = vUv;

    // animate uvs
    uv.y += 0.01 * (sin(uv.x * 3.5 + uTime * 0.35) + sin(uv.x * 4.8 + uTime * 1.05) + sin(uv.x * 7.3 + uTime * 0.45)) / 3.0;
    uv.x += 0.03 * (sin(uv.y * 4.0 + uTime * 0.5) + sin(uv.y * 6.8 + uTime * 0.75) + sin(uv.y * 11.3 + uTime * 0.2)) / 3.0;
    uv.y += 0.03 * (sin(uv.x * 4.2 + uTime * 0.64) + sin(uv.x * 6.3 + uTime * 1.65) + sin(uv.x * 8.2 + uTime * 0.45)) / 3.0;

    // ocean texture
    vec4 tex = texture2D(uOceanTexture, uv * repeat);
    tex.rgb *= 0.2;

    // ocean color
    vec3 color = vec3(0.07, 0.07, 0.59);
    color = mix(color, tex.rgb, 0.7);


    // float krakenRadius = 0.2;

    // float circle = 1.0 - step(krakenRadius, 0.2);
    // vec3 krakenColor = vec3(0.44, 0.09, 0.09) * circle;

    // color = mix(color, krakenColor, 0.5);

    // Final color
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}