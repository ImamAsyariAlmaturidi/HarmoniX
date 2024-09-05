const Groq = require("groq-sdk");

class Controller {
  static async prompting(req, res) {
    const { title, singer } = req.body;
    try {
      const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
      const response = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            // content : `please give me full lyric from music ${title} - ${singer}, and just give me lyrick without explain verse or chours`
            content: `please give me histories this singer ${singer}, and this music name ${title} and without symbol special character, without bold text or ** charather symbol`,
          },
        ],
        model: "llama3-8b-8192",
      });
      const text = response.choices[0]?.message?.content || "";
      res.status(200).json({
        text,
      });
      console.log(text);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;
