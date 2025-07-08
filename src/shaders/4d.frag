precision highp float;

uniform float iTime;
uniform vec2 iResolution;
uniform vec3 handBase;

vec3 hue2rgb(float h) {
    // h: 0 to 1
    return clamp(abs(mod(h * 6.0 + vec3(0,4,2), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

void main() {
    vec2 fragCoord = gl_FragCoord.xy - handBase.z;
    vec4 colorAccumulator = vec4(0.0);
    vec4 p, P;
    vec4 U = vec4(1.0, 2.0, 3.0, 0.0);



    float i = 0.0;
    float z = 0.0;
    float d = 0.0;
    float k = 0.0;

    // speed of animation
    float T = iTime * 1.0;
    float F = fract(T);
    float t = floor(T) + sqrt(F) / (handBase.y + 1.0);

    mat2 R = mat2(
    cos(t * 0.1 + 11.0 * U.w), -sin(t * 0.1 + 11.0 * U.w),
    sin(t * 0.1 + 11.0 * U.w),  cos(t * 0.1 + 11.0 * U.w)
    );

    vec3 res = vec3(iResolution, 0.0);

    for (i = 0.0; i < 77.0; i += 1.0) {
        z += 0.8 * d + 0.001;

        p = vec4(z * normalize(vec3(fragCoord - 0.5 * res.xy, res.y)), 0.2);
        p.z -= 4.0;

        // Rotate in XW plane
        float xw = p.x * R[0][0] + p.w * R[0][1];
        float wx = p.x * R[1][0] + p.w * R[1][1];
        p.x = xw; p.w = wx;

        // Rotate in YW plane
        float yw = p.y * R[0][0] + p.w * R[0][1];
        float wy = p.y * R[1][0] + p.w * R[1][1];
        p.y = yw; p.w = wy;

        // Rotate in ZW plane
        float zw = p.z * R[0][0] + p.w * R[0][1];
        float wz = p.z * R[1][0] + p.w * R[1][1];
        p.z = zw; p.w = wz;

        k = 9.0 / dot(p, p);

        P = p -= 0.5 * t;

    p = abs(p - round(p));

    d = abs(
    min(
    min(
    min(min(length(p.xz), length(p.yz)), length(p.xy)),
    length(p) - 0.2
    ),
    min(p.w, min(p.x, min(p.z, p.y))) + 0.05
    ) / k
    );

    vec4 pattern = 1.0 + sin(P.z + log2(k) + vec4(U.w, U.x, U.y, U.w));

    colorAccumulator += U * exp(0.7 * k - 6.0 * F) + pattern.w * pattern / max(d, 0.001);
    }

    vec4 finalColor = tanh(colorAccumulator / 10000.0) / 0.9;

    float hue = handBase.x;    // 0..1 range, from the wrist x position
    vec3 colorMod = hue2rgb(hue);
    finalColor.rgb *= colorMod;

    gl_FragColor = finalColor;
}
