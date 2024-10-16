uniform float uTime;

uniform vec4 uWindDirection;
uniform float uWindForce;
uniform float uWindSpeed;
uniform float uAlphaWindSpeed;
uniform float uWindFrequency;
uniform float uAlphaWindFrequency;

void main() {
    // Compute wind distance & direction
    vec4 windDistance = vec4(position.xyz, 0.0) - uWindDirection;
    vec4 windDirection = vec4(vec3(uWindForce), 0.0) * normalize(windDistance);

    // Main Wind
    float windSpeed = uWindSpeed * uTime;
    float windAmplitude = length(windDistance) / uWindFrequency;
    float windStrength = sin(windSpeed + windAmplitude);

    // Alpha wind
    float alphaWindSpeed = uAlphaWindSpeed * uTime;
    float alphaWindAmplitude = length(windDistance) / uAlphaWindFrequency;
    float alphaWindStrength = sin(alphaWindSpeed + alphaWindAmplitude);

    // TODO: Give users access to alter windShift, possibly set it's frequency and phaseshift

    // Remap sin of time (-1 -> 1) to a value 0 -> 1
    float windShift = (sin(uTime) + 1.0) / 2.0;
    vec4 finalOffset = windDirection * mix(windStrength, alphaWindStrength, windShift);

    // Compute final offset and set
    // finalOffset = v.color * finalOffset;
    csm_Position = position + finalOffset.xyz;
}