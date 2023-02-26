import React, { useState, useEffect } from 'react';

import {
  BrowserQRCodeReader,
  NotFoundException,
  ChecksumException,
  FormatException,
} from '@zxing/library';

export default function () {
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const [code, setCode] = useState('');
  const [videoInputDevices, setVideoInputDevices] = useState([]);

  const codeReader = new BrowserQRCodeReader();

  console.log('ZXing code reader initialized');

  function resetClick() {
    codeReader.reset();
    setCode('');
    console.log('Reset.');
  }

  function decodeContinuously() {
    codeReader.decodeFromImageUrl(
      'https://raw.githubusercontent.com/iqbalnurhakim/zxing-scanner-react-d2mv9v/main/qr-1.jpeg'
    );

    // codeReader.decodeFromInputVideoDeviceContinuously(
    //   selectedDeviceId,
    //   'video',

    //   (result, err) => {
    //     if (result) {
    //       console.log(result.getResultMetadata());
    //       console.log(result);
    //       // result.getResultMetadata();
    //       // properly decoded qr code
    //       // console.log('Found QR code!', result);
    //       setCode(result.text);
    //     }

    //     if (err) {
    //       setCode('');

    //       // As long as this error belongs into one of the following categories
    //       // the code reader is going to continue as excepted. Any other error
    //       // will stop the decoding loop.
    //       //
    //       // Excepted Exceptions:
    //       //
    //       //  - NotFoundException
    //       //  - ChecksumException
    //       //  - FormatException

    //       if (err instanceof NotFoundException) {
    //         // console.log('No QR code found.');
    //       }

    //       if (err instanceof ChecksumException) {
    //         // console.log("A code was found, but it's read value was not valid.");
    //       }

    //       if (err instanceof FormatException) {
    //         // console.log('A code was found, but it was in a invalid format.');
    //       }
    //     }
    //   }
    // );
  }

  useEffect(
    (deviceId) => {
      decodeContinuously(selectedDeviceId);
      console.log(`Started decode from camera with id ${selectedDeviceId}`);
    },
    [selectedDeviceId]
  );

  return (
    <main class="wrapper">
      <section className="container" id="demo-content">
        <div>
          <image src="https://raw.githubusercontent.com/iqbalnurhakim/zxing-scanner-react-d2mv9v/main/qr-1.jpeg" />
        </div>

        <label>Result:</label>
        <pre>
          <code id="result">{code}</code>
        </pre>

        <button id="resetButton" onClick={() => resetClick()}>
          Reset
        </button>
      </section>
    </main>
  );
}
