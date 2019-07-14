function SecurityCode(args) { 
    let param = Object.assign({
        lineWidth: 0.5, // 线宽
        lineNum: 2, 
        dotNum: 10, // 圆点数量
        dotRadius: 1,
        frontBgColor: [10, 80], // 前景色范围
        backBgColor: [150, 250], // 后景色范围
        fontSize: 20, // 字体样式
        fontFamily: 'sans-serif',
        fontStyle: 'fill',
        content:'acdefhijkmnpwxyABCDEFGHJKMNPQWXY12345789',
        length:4
    }, args)
    
    Object.keys(param).forEach(i => {
        this[i] = param[i];
    })

    this.canvas = null;
    this.paint = null;
    this.code = ''; // 验证码
}

// 初始化画布
SecurityCode.prototype.init = function (dom) {
    if (!this.paint) {
        this.canvas = dom;
        this.paint = this.canvas.getContext('2d');
        if (!this.paint) return;
        this.canvas.onclick = (e) => {
            this.fresh();
        }
    }

    this.drawBackground();
    this.drawLines();
    this.drawDots();
    this.drawContent();
}

// 背景绘制
SecurityCode.prototype.drawBackground = function () {
    let color = this.getRandomColor(this.backBgColor);
    this.paint.fillStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',0.8)';
    this.paint.fillRect(0, 0, this.canvas.width, this.canvas.height);
}

// 绘制线条
SecurityCode.prototype.drawLines = function () {
    for (let i = 0; i < this.lineNum; i++){
        let startX = this.getRandomNum(0, this.canvas.width);
        let startY = this.getRandomNum(0, this.canvas.height);
        let endX = this.getRandomNum(0, this.canvas.width);
        let endY = this.getRandomNum(0, this.canvas.height);

        this.paint.beginPath();
        this.paint.lineWidth = this.lineWidth;
        let color = this.getRandomColor(this.frontBgColor);
        this.paint.strokeStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',0.8)';

        this.paint.moveTo(startX, startY);
        this.paint.lineTo(endX, endY);
        this.paint.closePath();
        this.paint.stroke();
    }
}

// 绘制圆点
SecurityCode.prototype.drawDots = function () {
    for (let i = 0; i < this.dotNum; i++){
        let centerX = this.getRandomNum(0, this.canvas.width);
        let centerY = this.getRandomNum(0, this.canvas.height);
        let color = this.getRandomColor(this.frontBgColor);

        this.paint.beginPath();
        this.paint.arc(centerX, centerY, this.dotRadius, 0, 2 * Math.PI, false);
        this.paint.closePath();
        this.paint.fillStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',0.8)';
        this.paint.fill();
    }
}

// 绘制验证内容
SecurityCode.prototype.drawContent = function () {
    let content = this.generateCode();
    console.log(content);
    this.paint.font = this.fontSize + 'px ' + this.fontFamily;
    this.paint.textBaseline = 'middle';
    for (let i = 0; i < this.length; i++){
        let textWidth = this.paint.measureText(content[i]).width; // 获取文字的宽度
        // 文字的横坐标
        let x = this.getRandomNum((this.canvas.width / this.length * i)+textWidth/4, (this.canvas.width / this.length * i) + textWidth/2);
        // 文字旋转的角度
        let deg = this.getRandomNum(-5, 5);
        let color = this.getRandomColor(this.frontBgColor);
        this.paint.fillStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',0.8)';

        this.paint.save();
        this.paint.rotate(deg*Math.PI/180);
        this.paint.fillText(content[i], x, this.canvas.height / 2);
        this.paint.restore();
    }
}

// 更新验证内容
SecurityCode.prototype.fresh = function () {
    this.paint.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBackground();
    this.drawLines();
    this.drawDots();
    this.drawContent();
}

// 生成随机验证码
SecurityCode.prototype.generateCode = function () {
    let str = '';
    let len = this.content.length;
    for (let i = 0; i < this.length; i++) {
        str += this.content[this.getRandomNum(0, len)];
    }
    this.code = str;
    return str;
}

// 获取验证码
SecurityCode.prototype.getCode = function () {
    return this.code;
}

// 获取随机颜色
SecurityCode.prototype.getRandomColor = function (arr) {
    let color = new Array(3).fill(0);
    color = color.map(c => this.getRandomNum(arr[0], arr[1]));
    return color;
}

// 区间获取随机数
SecurityCode.prototype.getRandomNum = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
