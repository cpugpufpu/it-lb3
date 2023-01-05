class Scene {
    constructor(container, width, height, camera) {

        // Context of the container and data of the field

        this.container = container;
        this.context = this.container.getContext("2d");
        this.data = this.context.getImageData(0, 0, width, height);


        this.WIDHT = width;
        this.HEIGHT = height;

        this.container.width = width;
        this.container.height = height;

        this.OFFSET = this.WIDHT * 4;
        
        this.objects = [];
        this.light = [];

        this.camera = camera;
    }


    // Place proper data

    updateData(x, y, color) {
        x = this.WIDHT / 2 + x;
        y = this.HEIGHT / 2 + y;
    
        const flag = x < 0 
            || x > this.WIDHT
            || y < 0
            || y > this.HEIGHT;
    
        if (flag) return;
        
        let offset = 4 * x + this.OFFSET * y;
    
        this.data.data[offset++] = color[0];
        this.data.data[offset++] = color[1];
        this.data.data[offset++] = color[2];
        this.data.data[offset++] = 255;
    }


    // Update scene

    update() {
        this.context.putImageData(this.data, 0, 0);
    }
}


class Engine {
    constructor(scene) {
        this.scene = scene;
    }


    // Solve problem

    solver(D, item) {
        const OC = Vector.prototype.calculateVector(item.center, this.scene.camera.position);
    
        const k1 = D.product(D);
        const k2 = 2 * OC.product(D);
        const k3 = OC.product(OC) - item.radius * item.radius;
      
        const discriminant = k2 * k2 - 4 * k1 * k3;
        if (discriminant < 0) return [Infinity, Infinity];
      
        const t1 = (-k2 + Math.sqrt(discriminant)) / (2 * k1);
        const t2 = (-k2 - Math.sqrt(discriminant)) / (2 * k1);

        return [ t1, t2 ];
    };

    // This will return position

    calculatePosition(P) {
        const VP = this.scene.camera.viwport;
        const D = this.scene.camera.D;

        return new Vector([ P[0] * VP / this.scene.WIDHT, P[1] * VP / this.scene.HEIGHT, D ]);
    }


    // Basic tracer
    trace(D, tmn, tmx) {
        let ct = Infinity;
        let cs = null;
    
        for (let i = 0; i < this.scene.objects.length; i++) {
            const sphere = this.scene.objects[i];
            const [ t1, t2 ] = this.solver(D, sphere);

            if (t1 >= tmn && t1 <= tmx && t1 < ct) {
                ct = t1
                cs = sphere;

            }
    
            if (t2 >= tmn && t2 <= tmx && t2 < ct) {
                ct = t2
                cs = sphere;

            }
        }


        // If there is no intersections

        if (cs == null) return BACKGROUND_COLOR;

        let P =  D.multiply(ct).add(new Vector(this.scene.camera.position));

        // console.log(cs.center);

        let N = Vector.prototype.calculateVector([P.x, P.y, P.z], cs.center);

        N = N.multiply(1.0 / N.module());

        const I = this.computeLight(P, N);

        return cs.color.map(el => el * I);
    }

    computeLight(P, N) {
        let intensity = 0;
        const length_n = N.module();
        let LL;
    
        for (let i = 0; i < this.scene.light.length; i++) {
            switch (this.scene.light[i].type) {
                case "A":
                    intensity += this.scene.light[i].intensity;
                    break;
                default:
                    switch (this.scene.light[i].type) {
                        case "P":
                            LL = Vector.prototype.calculateVector(this.scene.light[i].position, P);
                            break;
                        case "D":
                            LL = new Vector(this.scene.light[i].position);
                            break;
                    }
                    const PR = N.product(LL);
                    if (PR > 0) {
                        intensity 
                            += this.scene.light[i].intensity * PR
                            / (length_n * LL.module());
                    }
            }
        }
    
        console.log(intensity); 

        return intensity;
    };

    renderScene() {
        for (let i = -1 * scene.WIDHT / 2; i < scene.WIDHT / 2; i++) {
            for (let j = -1 * scene.HEIGHT / 2; j < scene.HEIGHT / 2; j++) {

                // 3D vector 
                const D = this.calculatePosition([i, j]);

                // Calculate the color
                const color = this.trace(D, -1, Infinity);
 
                // Output
                this.scene.updateData(i, j, color);
            }
        }

        // Fin
        this.scene.update();
    }
};



// Standart color for BG

const BACKGROUND_COLOR = [255, 255, 255];

let camera = new Camera([0, -1, -7], 1, 1);
let scene = new Scene(document.querySelector(".container-scene"), 300, 300, camera);
scene.objects = [new Sphere([0, 0, 2], 1, [255, 0, 0]), new Sphere([2, -1, 4], 1, [255, 0, 255])];
scene.light = [new Light("A", 0.2, []), new Light("P", 0.1, [2, 1, 0]), new Light("D", 0.7, [1, 4, 4])];

const engine = new Engine(scene);


engine.renderScene();













function average(array = []) {
    return array.reduce((sum, a) => sum + a, 0) / array.length;
}

function collectDateTimestamps(selector) {
    return [].map.call(
        document.querySelectorAll(selector), (item) => item.value ? +new Date(item.value) : 0
    ).filter((item) => item > 0);
}

function calc() {
    const currentYear = new Date().getFullYear();
    const averageYear = new Date(average(collectDateTimestamps('[id^="ehd"]'))).getFullYear();

    document.querySelector('.result').innerText = currentYear - averageYear;
}

document.querySelector('#calc-btn').onclick = calc;



function People(name, age) {
    this.name = name;
    this.age = age;
}

