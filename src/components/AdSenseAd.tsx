import React, { useEffect } from 'react';

const AdSenseAd = () => {
  useEffect(() => {
    try {
      (window as any).adsbygoogle?.push({});
    } catch (e: any) {
      if (e?.message && e.message.includes("already have ads in them")) {
        console.log("AdSense: Ad already initialized.");
      } else {
        console.error("AdSense error:", e);
      }
    }
  }, []);

  return (
    <div className="ads-container">
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-6889176306076912"
           data-ad-slot="5306892488"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
};

export default AdSenseAd;
