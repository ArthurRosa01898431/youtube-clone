import express from "express";
import ffmeg from "fluent-ffmpeg"

const app = express();
app.use(express.json());

app.post('/process-video', (req, res) => {
    // Get path of the input video file from the request body.
    const inputFilePath = req.body.inputFilePath;
    const outputFilePath = req.body.outputFilePath;

    // Check if the file path is defined.
    if (!inputFilePath) {
        res.status(400).send("Bad Request: Missing input file path.");
    }

    if (!outputFilePath) {
        res.status(400).send("Bad Request: Missing output file path.");
    }

    // Create the ffmpeg command.
    // Configures input path to 360p and sends message when finished.
    // If an error occured send error message.
    ffmeg(inputFilePath)
        .outputOption("-vf", "scale=-1:360")
        .on("end", () => {
            console.log('Processing finished successfully');
            res.status(200).send('Processing finished successfully');
        })
        .on("error", function(err: any) {
            console.log('An error occured: ' + err.message);
            res.status(500).send('An error occured: ' + err.message);
        })
        .save(outputFilePath);

});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});