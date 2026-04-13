import { useEffect, useState } from "react";

function QRCard({url, title, info, qrSize = 128})
{
    const [imgSrc, setImgSrc] = useState();

    useEffect(() =>
    {
        const setURL = async () =>
        {
            const response = await fetch("https://qrmint.dev/api/v1/generate", 
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data: url, size: qrSize })
            });

            const blob = await response.blob();
            setImgSrc(URL.createObjectURL(blob));
        }
        setURL();
    }, [url]);

    return(
        <section>
            <img src={imgSrc} alt="QR Code"></img>
            <h3>{title}</h3>
            <p>{info}</p>
        </section>
    );
}

export default QRCard;