import { useEffect, useState } from "react";
import { createHighlighter } from "shiki";

const Codeblock = ({ formCode, lang }: { formCode: string; lang: string }) => {
  const [highlightedCode, setHighlightedCode] = useState<string | null>(null);



  useEffect(() => {
    const loadHighlighter = async () => {
      const highlighter = await createHighlighter({
        themes: ["vitesse-dark"],
        langs: [lang],
      });

      const code = highlighter.codeToHtml(formCode, {
        theme: "vitesse-dark",
        lang: lang,
      });

      setHighlightedCode(code);
    };

    loadHighlighter();
  }, [formCode]);

  if (!highlightedCode) {
    return (
      <div className="border p-4 rounded-md">
        <div className="text-sm bg-[#171717] rounded-md text-white p-4 h-full max-h-[90vh]">
          Loading...
        </div>
      </div>
    );
  }
  return (
    <div
      className="w-full h-full overflow-auto p-4 border rounded-md"
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
    />
  );
};

export default Codeblock;
