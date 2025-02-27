const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    expenseType: {
        type: String,
        required: true
    },
    expenseAmount: {
        type: Number,
        required: true,
        min: [0,"amount cannot be negative"]
    },
    settledAmount: {
        type: Number,
        default: 0,
        validate: {
            validator: function(value) {
                console.log(value,this.expenseAmount)
                /* ensure that the settled amount is not greater than the total expense amount */
                return value <= this.expenseAmount;
            },
            message: "settled amount cannot be greater than the expense amount"
        }
    },
    pendingAmount: {
        type: Number,
        default: function() {
            return this.expenseAmount - this.settledAmount
        }
    },
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
    /* one crop record can have many work details  */
    workDetails: [workDetailSchema] // embed work detail directly inside crop record
});



exports.CropRecord = mongoose.model("crop_record",cropRecordSchema);