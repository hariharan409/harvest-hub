const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    expenseType: {
        type: String,
        required: true
    },
    expenseAmount: {
        type: Number,
        required: true,
    },
    settledAmount: {
        type: Number,
        default: 0,
    },
    // pendingAmount: {
    //     type: Number,
    //     default: 0
    // },
    expenseDate: {
        type: Date,
        required: true
    },
    expenseDescription: String
});

const workDetailSchema = new mongoose.Schema({
    workType: {
        type: String,
        required: true
    },
    workDate: {
        type: Date,
        required: true
    },
    workDescription: String,
    /* one work details can have many expense  */
    expenseList: [expenseSchema] // embed expenses directly inside work detail
});


const cropRecordSchema = new mongoose.Schema({
    /* each crop record should correspond to a single crop.  */
    cropID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "crop",
        required: true
    },
    plantingDate: {
        type: Date,
        required: true
    },
    harvestingDate: {
        type: Date,
    },
    embedding: {
        type: [Number], // array of numbers for vector storage
        required: false, // optional, only available after embeddings are generated
    },
    // flag which is used to track the status of the crop
    status: {
        type: String,
        enum: ['planted', 'harvested', 'others'],
        message: "status must be either 'planted' or 'harvested' or 'others'"
    },
    /* one crop record can have many work details  */
    workDetails: [workDetailSchema] // embed work detail directly inside crop record
},{ strict: true });



exports.CropRecord = mongoose.model("crop_record",cropRecordSchema);