import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function RedirectURL() {
  const { shortID } = useParams<{ shortID: string }>();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (shortID) {
      fetch(`/api/v1/${shortID}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.url) {
            let currentCount = 5;
            const interval = setInterval(() => {
              currentCount -= 1;
              setCountdown(currentCount);
              if (currentCount === 0) {
                clearInterval(interval);
                window.location.href = data.url;
              }
            }, 1000);
          } else {
            window.location.href = "/";
          }
        })
        .catch(() => {
          window.location.href = "/";
        });
    }
  }, [shortID]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirecting in {countdown} seconds...</p>
    </div>
  );
}

export default RedirectURL;
