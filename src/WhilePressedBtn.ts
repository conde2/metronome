/**
 * WhilePressedBtn. A button which repeatedly triggers an event while pressed.
 */
enum MouseCodes { LEFT = 1 };

const keyDownRepeatDelay = 500; //ms. Same as Chrome.
const keyDownRepeatInterval = 30; //ms. Same as Chrome.

export default class WhilePressedBtn {

    private btn: HTMLInputElement;
    private mouseIsPressed: boolean = false;
    private mouseDownTimerHandle: number = 0;
    private mouseDownHandlerFunction: () => void;

    constructor(btnElement: HTMLInputElement, handlerFunction: () => void) {

        this.btn = btnElement;
        this.mouseDownHandlerFunction = handlerFunction;

        this.btn.addEventListener('mousedown', (event) => {
            if (event.which !== MouseCodes.LEFT) return;
            this.mouseIsPressed = true;
            this.mouseDownHandlerFunction();
            this.mouseDownTimerHandle = setTimeout(() => { this.mouseDownLoop() }, keyDownRepeatDelay);
        });

        //Add mouseup eventlistener to document in case the mouse is moved away from btn before it is released.
        document.addEventListener('mouseup', (event) => {
            if (event.which !== MouseCodes.LEFT) return;
            this.mouseIsPressed = false;
            clearTimeout(this.mouseDownTimerHandle);
        });
    }

    private mouseDownLoop(): void {

        if (!this.mouseIsPressed) {
            return;
        }

        this.mouseDownHandlerFunction();

        this.mouseDownTimerHandle = setTimeout(() => { this.mouseDownLoop() }, keyDownRepeatInterval);
    }
}