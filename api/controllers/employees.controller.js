const Employee = require('../models/employee');

//GET all employee records
exports.get_all_employees = (req, res, next) => {
    Employee.find()
    .exec()
    .then(docs => {
        if(docs.length === 0){
            res.status(404).json({
                message: 'No Employee details exist in database.'
            });
        }
        res.status(200)
        .json({
            count: docs.length,
            employees: docs.map(doc => {
                return{
                    employeeNumber: doc.employeeNumber,
                    employeeName: doc.employeeName,
                    title: doc.title,
                    location: doc.location
                };
            })
        })
    })
    .catch(err => res.status(500).json({error: err}));
}

//function to add employee record
exports.add_employee =  (req, res, next) => {
    if(req.body.employeeNumber === undefined || isNaN(req.body.employeeNumber)){
        return res.status(401).json({
            message: 'Invalid Employee Number.'
        });
    } else if (req.body.name === undefined || req.body.name === ''){
        return res.status(401).json({
            message: 'Invalid Employee Name.'
        });
    }

    const employee = new Employee({
       _id: req.body.employeeNumber,
        employeeName: req.body.name,
        title: req.body.title,
        location: req.body.location
    });

    employee.save();
    
    res.status(201).json({
        message: 'Employee details added to database successfully.',
        createdEmplyee: employee
    });
}

//GET method to retrieve specific employee record
exports.get_employee = (req, res, next) => {
    const empNumber = req.params.employeeNumber;

    //check if Employee Number is a 
    if(isNaN(empNumber)){
        return res.status(401).json({
            message: 'Invalid Employee Number'
        });
    }
    
    Employee.find({_id : empNumber})
    .exec()
    .then(docs => {
        if(docs.length === 0){
            res.status(404).json({
                message: 'Specified Employee does not exist.'
            });
        }else{
            res.status(200)
            .json({
                count: docs.length,
                employees: docs.map(doc => {
                    return{
                        employeeNumber: doc._id,
                        employeeName: doc.employeeName,
                        title: doc.title,
                        location: doc.location
                    };
                })
            })
        }
    })
    .catch(err => res.status(500).json({error: err}));
}

//function to delete specific employee
exports.delete_employee = (req, res, next) => {
    Employee.remove({_id : req.params.employeeNumber})
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({error: err});
    });
}