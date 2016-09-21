/* @flow */
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import gamelogic from './gamelogic.js';

const clockStyle = {
    width: "100%",
    height: "auto",
    backgroundColor: '#333',
};

class Clock extends Component {

    ctx: CanvasRenderingContext2D;
    radius;

    componentDidMount() {
        const canvas : HTMLCanvasElement = this.refs['canvas'];
        const ctx = canvas.getContext('2d');
        if (ctx) {
            this.ctx = ctx;
            const radius = canvas.height / 2;
            this.ctx.translate(radius, radius);
            this.radius = radius * 0.9;
            this.drawClock(this.props.time);
        }
    }

    componentDidUpdate() {
        this.drawClock(this.props.time);
    }

    drawClock(time) {
        this.drawFace(this.ctx, this.radius);
        this.drawNumbers(this.ctx, this.radius);
        this.drawHands(this.ctx, this.radius, time.hours, time.minutes);
    }

    drawFace(ctx, radius) {
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();

        const grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
        grad.addColorStop(0, '#333');
        grad.addColorStop(0.5, 'white');
        grad.addColorStop(1, '#333');
        ctx.strokeStyle = grad;
        ctx.lineWidth = radius * 0.1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
        ctx.fillStyle = '#333';
        ctx.fill();
    }

    drawNumbers(ctx, radius) {
        ctx.font = radius * 0.15 + 'px arial';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';

        for (let i = 1; i < 13; i++) {
            const ang = i * Math.PI / 6;
            ctx.rotate(ang);
            ctx.translate(0, -radius * 0.85);
            ctx.rotate(-ang);
            ctx.fillText(i.toString(), 0, 0);
            ctx.rotate(ang);
            ctx.translate(0, radius * 0.85);
            ctx.rotate(-ang);
        }
    }

    drawHands(ctx, radius, hours, minutes) {
        const hourHand = (hours * Math.PI / 6) + (minutes * Math.PI / (6 * 60));
        this.drawHand(ctx, hourHand, radius * 0.45, radius * 0.06);
        const minuteHand = minutes * Math.PI / 30;
        this.drawHand(ctx, minuteHand, radius * 0.7, radius * 0.06);
    }

    drawHand(ctx, pos, length, width) {
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.lineCap = 'round';
        ctx.moveTo(0, 0);
        ctx.rotate(pos);
        ctx.lineTo(0, -length);
        ctx.stroke();
        ctx.rotate(-pos);
    }

    render() {
        return <canvas ref="canvas" width="400" height="400" style={clockStyle} />;
    }
}

const container = observer(() => (
    <Clock time={gamelogic.possibleAnswers[gamelogic.correctAnswer]}/>
));

export default container;

