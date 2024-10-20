const express = require("express");
const Data = require("../model/Data");
const { authToken } = require("../middlewares/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Data.find({});
    res.json({
      res: data,
    });
  } catch (error) {
    res.send({
      res: error,
    });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { start, end, age, gender, bar } = req.query;
    // console.log(req.query);

    const startDate = (start!='null') ? new Date(start):null; // Query start date
    const endDate = (end!='null') ? new Date(end):null;
     console.log(startDate);

    // Build query filters
    const filters = {};
    // Add date range filter if start or end is provided
    if (startDate && endDate) {
      filters.Day = { $gte: startDate, $lte: endDate }; // Both start and end provided
    } else if (startDate) {
      filters.Day = { $gte: startDate }; // Only start provided
    } else if (endDate) {
      filters.Day = { $lte: endDate }; // Only end provided
    }

    // Add gender filter if provided
    if (gender!='null') {
        const genderCaps = gender[0].toUpperCase() + gender.slice(1);
      filters.Gender = genderCaps;
    }

    // Add age filter if provided
    if (age!='null') {
      let ageNum = Number(age);
      if(ageNum<25 || ageNum>=18){
        filters.Age = 18;
        // filters.Age = Number(age);
      }
      else{
        filters.Age = 25
      }
    }
  //  console.log(filters)
    // Query the database using Mongoose
    let filterSumValues = await Data.aggregate([
        // Match documents based on the filter criteria
        {
          $match: filters
        },
        // Group with _id: null to sum across all documents
        {
          $group: {
            _id: 0, // No grouping key, so it sums across all matched documents
            A: { $sum: "$A" },
            B: { $sum: "$B" },
            C: { $sum: "$C" },
            D: { $sum: "$D" },
            E: { $sum: "$E" },
            F: { $sum: "$F" }
          }
        }
      ]);
    if (bar!='null') {

    const barValues = await Data.aggregate([
        {
          $match:filters
        },
        {
            $group: {
              _id: { $dateToString: { format: "%Y-%m-%d", date: "$Day" } }, 
              totalA: { $sum: `$${bar}` }, 
            }
          },
          {
            $sort: { _id: 1 }
          }
    ]);

      return res.json({
        filterSumValues,
        barValues,
      });
    }

    res.json({filterSumValues});

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/linebar", async (req, res) => {

  const { start, end, age, gender,id } = req.query;
  // console.log(req.query);

  const startDate = (start!='null' && start) ? new Date(start):null; // Query start date
  const endDate = (end!='null' && end) ? new Date(end):null;
 

  // Build query filters
  const filters = {};
  // Add date range filter if start or end is provided
  if (startDate && endDate) {
    filters.Day = { $gte: startDate, $lte: endDate }; // Both start and end provided
  } else if (startDate) {
    filters.Day = { $gte: startDate }; // Only start provided
  } else if (endDate) {
    filters.Day = { $lte: endDate }; // Only end provided
  }

  // Add gender filter if provided
  if (gender!='null' &&  gender) {
      const genderCaps = gender[0].toUpperCase() + gender.slice(1);
    filters.Gender = genderCaps;
  }

  if (age!='null') {
    let ageNum = Number(age);
    if(ageNum<25 || ageNum>=18){
      filters.Age = 18;
      // filters.Age = Number(age);
    }
    else{
      filters.Age = 25
    }
  }

  try {
    const barValues = await Data.aggregate([
      {
        $match:filters
      },
        {
            $group: {
              _id: { $dateToString: { format: "%Y-%m-%d", date: "$Day" } }, 
              [id]: { $sum: `$${id}` }, 
            }
          },
          {
            $sort: { _id: 1 }
          }
    ]);

    res.json({barValues});

  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
