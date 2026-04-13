import { useEffect, useState } from "react";

function QRCard({data = "QR Code Generator", title = "QR Code Generator", info = "This is a simple QR code generator using the QRMint API", qrSize = 128})
{
    const [imgSrc, setImgSrc] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() =>
    {
        const setData = async () =>
        {
            try
            {
                setLoading(true);
                setError(null);

                const response = await fetch("https://qrmint.dev/api/v1/generate", 
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ data: data, size: qrSize })
                });

                if (!response.ok)
                {
                    throw new Error("Unable to generate QR code. Please try again.");
                }
    
                const blob = await response.blob();
                setImgSrc(URL.createObjectURL(blob));
            }
            catch(err)
            {
                console.error("QR error: ", err);
                setError(err.message);
            }
            finally
            {
                setLoading(false);
            }
        }
        setData();

    }, [data, qrSize]);

    return(
        <section>
            { loading && <p>Generating QR code...</p> }
            { error && <p>{error}</p> }
            { !loading && !error && imgSrc && (<img src={imgSrc} alt="QR Code."></img>) }
            <h3>{title}</h3>
            <p>{info}</p>
        </section>
    );
}

export default QRCard;