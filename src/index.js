
const GRAVITY_ACC = 9.81 * 3.6 * 60.0,          // gravity acceleration
DRAG        = 60.0 * 0.3 / 3.6,                 // force applied by air on the cyclist
DELTA_T     = 1.0 / 60.0,                       // in minutes
G_THRUST    = 60 * 3.6 * 3.6,                   // pedaling thrust
MASS        = 80.0,                             // biker's mass
WATTS0      = 225.0,                            // initial biker's power
D_WATTS     = 0.5;                              // loss of power at each deltaT

module.exports = function temps(v0, slope, dTot) {
    const gravityA = GRAVITY_ACC * Math.sin(Math.atan(slope / 100));
    let d = 0;
    let v = v0;
    let watts = WATTS0;
    let i;
    for(i = 0; d < dTot && i < 100000; i++) {
        const airDrag = DRAG * v * v / MASS;
        const thrust = watts > 0 && v > 0 ? G_THRUST * watts / (v * MASS) : 0;
        const gamma = thrust - gravityA - airDrag;
        watts -= D_WATTS * DELTA_T;
        v = v + gamma * DELTA_T;
        d += v * DELTA_T / 60;
        
        if(v - 3.0 <= 1e-2) return -1;
    }
    return Math.round(i * DELTA_T);
}
