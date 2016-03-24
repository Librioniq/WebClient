
import environment from '../../main/server/environment';

function declare() {
    console.log("declared");
    const envKey = "environment";
    global[envKey] = environment;
};
export default declare();
