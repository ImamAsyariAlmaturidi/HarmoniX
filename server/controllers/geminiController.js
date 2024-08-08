const { GoogleGenerativeAI } = require("@google/generative-ai");;
class Controller {
    static async prompting(req, res) {
        const {title, singer} = req.body
        try {
            console.log(singer)
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })
            const prompt = `please give me histories this singer ${singer}, and without symbol special character, without bold text or ** charather symbol`

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            res.status(200).json({
                text
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Controller