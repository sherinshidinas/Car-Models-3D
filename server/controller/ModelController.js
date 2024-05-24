import Model from "../models/Model.js";

export const uplaodModel = async (req, res) => {
  try {
    const { name, description } = req.body;

    console.log('req.file:', req.file);
    console.log('req.body:', req.body);

    if (!req.file) {
        return res.status(400).send("No file uploaded!");
      }

    const model = new Model({
      name,
      description,
      path: req.file.path,
    });
    await model.save()
    res.status(201).send("Model uploaded successfully!")
  } catch (error) {
    console.log(error)
    res.status(500).send("Server error occur while uploading model!")
  }
};

export const getModels = async (req,res) => {
    try {
        const models = await Model.find()
        res.status(200).send(models)
        console.log("models fetched successfully!")
        
    } catch (error) {
        console.log(error)
        res.status(501).send("Server error occured while fetching models!")
        
    }
}
