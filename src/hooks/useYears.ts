import { useState, useEffect } from "react";
import downloadYear, { Year } from "../fetch-events";

type DownloadableYear = {
  year: string;
  url: string;
};

const useYears = (downloadableYears: DownloadableYear[]): [Year[], boolean] => {
  const [years, setYears] = useState<Year[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const download = async (name: string, url: string) => {
      return await downloadYear(name, url);
    };

    Promise.all(downloadableYears.map((d) => download(d.year, d.url))).then(
      (years) => {
        setLoading(false);
        setYears(years);
      }
    );
  }, []);

  return [years, loading];
};

export default useYears;
