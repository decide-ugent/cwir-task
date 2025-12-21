let recording = false; // Flag to indicate if recording is active
let mouseTrackingXcor = []; // Array to store mouse x coordinates
let mouseTrackingYcor = []; // Array to store mouse y coordinates
let intervalId = null; // ID for the setInterval to control recording frequency
let frequency = 20


let lastXcor = null;
let lastYcor = null;

// Start recording
function startRecording(frequency) {
    //console.log("start recording");
    recording = true;

    // Reset last recorded position to prevent carryover from previous rounds
    lastXcor = null;
    lastYcor = null;

    // Reset coordinates
    mouseTrackingXcor = [];
    mouseTrackingYcor = [];


    // Get coordinates of big box
    const rect = bigContainer[0].getBoundingClientRect();
    bigRectTopYCoord = rect.top
    bigRectBottomYCoord = rect.bottom
    bigRectLeftXCoord = rect.left
    bigRectRightXCoord = rect.right

    // Function to record the mouse position
    function recordMousePosition() {
        if (recording) {
            if (lastXcor !== null && lastYcor !== null) {
                mouseTrackingXcor.push(lastXcor);
                mouseTrackingYcor.push(lastYcor);
            }
        }
    }

    // Attach the mousemove event listener
    $(document).on('mousemove', function(event) {
        if (!recording) return; // Prevent updating positions if not recording
   
        const x_cor = event.clientX - rect.left;
        const y_cor = rect.bottom - event.clientY;

        //if (x_cor < 0 || x_cor > bigContainer.width() || y_cor < 0 || y_cor > bigContainer.height()) {
        if (x_cor < 0 || x_cor > rect.width || y_cor < 0 || y_cor > rect.height) {
            lastXcor = -1;
            lastYcor = -1;
        } else {
            lastXcor = x_cor;
            lastYcor = y_cor;
        }
    });

    // Start the interval to record mouse position
    if (!intervalId) {
        intervalId = setInterval(recordMousePosition, frequency);
    }
}

// Stop recording
function stopRecording() {
    //console.log("stop recording");
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }
    recording = false;

    // Remove the mousemove event listener
    $(document).off('mousemove');
}
