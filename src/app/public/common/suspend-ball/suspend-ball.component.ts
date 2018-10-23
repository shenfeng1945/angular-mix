import { Component, OnInit, Input, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { AppComponentBase } from '../../base/app-common.base';

@Component({
    selector: 'app-suspend-ball',
    templateUrl: './suspend-ball.component.html',
    styleUrls: ['./suspend-ball.component.scss']
})
export class SuspendBallComponent extends AppComponentBase implements OnInit, AfterViewInit {
    bodyPostion: number[];
    initValue: Array<number>; // 页面加载时球的位置
    currentValue: Array<number>; // 每次开始触摸的坐标
    touchBallVaule: Array<number>; // 相对于球的坐标
    lastValue: Array<number>; // 球最后时刻的位置
    ball: any; // dom
    deviceValue: Array<number>; // 该设备的宽高
    ballMsg: Array<number>; // 球的宽高
    ballFree = true; // 没有接触球了
    ballTranslateX = '5px';
    ballTranslateY = '200px';
    pcMouseDownPosi: any;
    ballAbsolutePosition: any; // 球相对位置
    constructor(
        // public modelPopup: ModelPopupService,
        private el: ElementRef,
        private rd2: Renderer2,
    ) {
        super();
    }
    ngOnInit() {
        this.computDevice();
        // tslint:disable-next-line:radix
        this.lastValue = this.initValue = [parseInt(this.ballTranslateX), parseInt(this.ballTranslateY)];
        window.addEventListener('resize', () => {
            this.computDevice();
            this.computeBall();
            this.getBodyPostion();
        });
    }

    ngAfterViewInit() {
        this.ball = document.querySelector('.ball');
        // this.ballMove(this.initValue)
        this.computeBall();
        this.pcDragBall();
        this.getBodyPostion();
    }

    getBodyPostion() {
        const bodyPosiClient = document.body.children[0].getBoundingClientRect();
        this.bodyPostion = [bodyPosiClient.left, bodyPosiClient.top];
    }
    pcDragBall() {
        this.ball.addEventListener('mousedown', e => {
            this.pcMouseDownPosi = [e.x, e.y];
            e.preventDefault();
            this.ballFree = false;
            const clientX = e.x - this.bodyPostion[0];
            const clientY = e.y - this.bodyPostion[1];
            this.currentValue = [clientX, clientY];
            this.touchBallVaule = [clientX - this.initValue[0], clientY - this.initValue[1]];
            this.cancleTransition();
            this.ball.addEventListener('mousemove', this.mouseMove);
            this.ball.addEventListener('mouseup', this.mouseUp);
        });
    }
    mouseUp = (eUp) => {
        this.ball.getBoundingClientRect();
        this.ball.removeEventListener('mousemove', this.mouseMove);
        // if (this.pcMouseDownPosi[0] === eUp.x && this.pcMouseDownPosi[1] === eUp.y) {
        //     this.openModel(eUp);
        // };
        eUp.stopPropagation();
        this.ballFree = true;
        const clientX = this.pcMouseDownPosi[0] - this.bodyPostion[0];
        const clientY = this.pcMouseDownPosi[1] - this.bodyPostion[1];
        this.initValue = [clientX - this.touchBallVaule[0], clientY - this.touchBallVaule[1]];
        this.setTransition();
        this.computeTrail();
    }
    mouseMove = (e) => {
        e.stopPropagation();
        const clientX = e.x - this.bodyPostion[0];
        const clientY = e.y - this.bodyPostion[1];
        this.ballMove(
            [clientX - (this.currentValue[0] - this.initValue[0]),
            clientY - (this.currentValue[1] - this.initValue[1])
            ]);
    }
    touchStart(e: TouchEvent) {
        e.stopPropagation();
        this.ballFree = false;
        const clientX = e.targetTouches[0].clientX;
        const clientY = e.targetTouches[0].clientY;
        this.currentValue = [clientX, clientY];
        this.touchBallVaule = [clientX - this.initValue[0], clientY - this.initValue[1]];
        this.cancleTransition();
    }

    touchEnd(e) {
        e.stopPropagation();
        this.ballFree = true;
        const clientX = e.changedTouches[0].clientX;
        const clientY = e.changedTouches[0].clientY;
        this.initValue = [clientX - this.touchBallVaule[0], clientY - this.touchBallVaule[1]];
        this.setTransition();
        if (!this.shouldMoveBall([clientX, clientY])) {
            return;
        }
        this.computeTrail();
    }

    touchMove(e) {
        e.stopPropagation();
        const clientX = e.targetTouches[0].clientX;
        const clientY = e.targetTouches[0].clientY;
        this.ballMove(
            [clientX - (this.currentValue[0] - this.initValue[0]),
            clientY - (this.currentValue[1] - this.initValue[1])
            ]);
    }

    ballMove([x, y]: Array<number>): void {
        this.ball.style.transform = `translate(${x}px,${y}px)`;
        this.lastValue = [x, y];
        // 粘连动画结束后，球记下初始位置
        if (this.ballFree) {
            this.initValue = [x, y];
        }
    }

    // 触摸结束粘连动画
    setTransition() {
        this.ball.classList.add('anima');
    }

    cancleTransition() {
        this.ball.classList.remove('anima');
    }

    computeTrail() {
        // 球中心相对屏幕的位置
        const x = this.lastValue[0] + this.ballMsg[0] / 2;
        const y = this.lastValue[1] + this.ballMsg[1] / 2;
        // 屏幕中心点位置
        const dX = this.deviceValue[1] / 2;
        const dY = this.deviceValue[0] / 2;
        // 四象限，相对屏幕中心
        if (x <= dX && y <= dY) {
            // 球移动左上角范围之外
            if ((x - this.ballMsg[0] / 2) < 0 && (y - this.ballMsg[0] / 2) < 0) {
                this.ballMove([5, 5]);
                return;
            }
            if (x <= y) {
                this.ballMove([5, y - this.ballMsg[0] / 2]);
            } else {
                this.ballMove([x - this.ballMsg[1] / 2, 5]);
            }
        } else if (x <= dX && y > dY) {
            // 三象限
            // 左下角范围之外
            if ((x - this.ballMsg[0] / 2) < 0 && (this.deviceValue[0] - (y + this.ballMsg[0] / 2) < 0)) {
                this.ballMove([5, this.deviceValue[0] - 5 - this.ballMsg[1]]);
                return;
            }
            if (x <= (this.deviceValue[0] - y)) {
                this.ballMove([5, y - this.ballMsg[0] / 2]);
            } else {
                this.ballMove([x - this.ballMsg[1] / 2, this.deviceValue[0] - 5 - this.ballMsg[1]]);
            }
        } else if (x > dX && y <= dY) {
            // 一象限
            if ((this.deviceValue[1] - (x + this.ballMsg[1] / 2)) < 0 && (y - this.ballMsg[0] / 2) < 0) {
                this.ballMove([this.deviceValue[1] - 5 - this.ballMsg[1], 5]);
                return;
            }
            if (y <= (this.deviceValue[1]) - x) {
                this.ballMove([x - this.ballMsg[1] / 2, 5]);
            } else {
                this.ballMove([this.deviceValue[1] - 5 - this.ballMsg[0], y - this.ballMsg[0] / 2]);
            }
        } else if (x > dX && y > dY) {
            // 二象限
            if ((this.deviceValue[1] - (x + this.ballMsg[1] / 2)) < 0 && (this.deviceValue[0] - (y + this.ballMsg[0] / 2)) < 0) {
                this.ballMove([this.deviceValue[1] - 5 - this.ballMsg[0], this.deviceValue[0] - 5 - this.ballMsg[1]]);
                return;
            }
            if (this.deviceValue[0] - y <= this.deviceValue[1] - x) {
                this.ballMove([x - this.ballMsg[1] / 2, this.deviceValue[0] - 5 - this.ballMsg[1]]);
            } else {
                this.ballMove([this.deviceValue[1] - 5 - this.ballMsg[0], y - this.ballMsg[0] / 2]);
            }
        }
    }

    // 计算设备的宽，高
    computDevice() {
        let h = document.documentElement.clientHeight;
        let w = document.documentElement.clientWidth;
        if (!this.ismoblie()) {
            h = 375;
            w = 667;
        }
        this.deviceValue = [h, w];
    }

    computeBall() {
        this.ballMsg = [this.ball.clientWidth, this.ball.clientHeight];
    }

    // 轻微触摸不动
    shouldMoveBall(array) {
        if (Math.abs(array[0] - this.currentValue[0]) < 2 && Math.abs(array[1] - this.currentValue[1]) < 2) {
            return false;
        }
        return true;
    }

    // openModel(e) {
    //     e.stopPropagation();
    //     this.modelPopup.openModel();
    // }
    // ngOnDestroy(): void {
    //     //保存球的位置
    //     AppConst.ballLastValue = [this.lastValue[0], this.lastValue[1]]
    // }
}
