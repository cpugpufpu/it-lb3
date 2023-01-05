class Vector {
    constructor(data) {
        this.x = data[0];
        this.y = data[1];
        this.z = data[2];
    }


    // B - A -> vector

    calculateVector(A, B) {
        return new Vector([B[0] - A[0], B[1] - A[1], B[2] - A[2]]);
    }


    // vector * n

    multiply(n) {
        return new Vector([this.x * n, this.y * n, this.z * n]);
    }


    // vector1 + vector2

    add(vector) {
        return new Vector([this.x + vector.x, this.y + vector.y, this.z + vector.z]);
    }


    // <vector1, vector2> 

    product(vector) {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    }


    // |vector|

    module() {
        return Math.sqrt(this.product(this));
    }
};


class Camera {
    constructor(position, D, viwport) {
        this.position = position;
        this.D = D;
        this.viwport = viwport;
    }
};


class Sphere {
    constructor(center, radius, color) {
        this.center = center;
        this.radius = radius;
        this.color = color;
    }
};


class Light {
    constructor(type, intensity, position) {
        this.type = type;
        this.intensity = intensity;
        this.position = position;
    }
};
Footer
