const Participate = require("../models/participate.model"); 
const Statemaster = require("../models/statemaster.model"); 
const Candidatemaster = require("../models/candidatemaster.model"); 
const Constitution = require("../models/constitution.model.js"); 
const ElectionType = require("../models/electionType.model"); 

// Create and Save a new Participate
exports.create = (req, res) => { 
    if (!req.body.electionTypeCode || !req.body.electionTypeName) {
        res.status(400).send({ status:"error",message: "electionTypeCode or electionTypeName field is missing!" });
        return;
    }else{ 
        const electionTypeNewData = new Participate({
            election_type_code: req.body.electionTypeCode,
            election_type_name: req.body.electionTypeName,
            delete_status: 0,
            created_date:"",
            updated_date:""
        }); 
        Participate.save(electionTypeNewData).then(data => {
            res.status(200).send({status:"success",data});
        }).catch(err => {
            res.status(500).send({
                status:"fail",
                message:
                err.message || "Some error occurred while creating the Election Type."
            });
        });
    }

};
 
exports.findAll = (req, res) => {

    console.log('s', req.body)
    console.log('p', req.params)
    console.log('qqes', req.query)

    if (!req.query.constitution_code) {
        res.status(400).send({ status:"error",message: "electionTypeCode and electionTypeName fields are missing!" });
        return;
    }else{

        const election_type_code = req.body.election_type_code;
        const consti_code = req.query.constitution_code;
        var condition = {"election_type_code": election_type_code, "constitution_code": consti_code};

        ElectionType.aggregate([ {
            $lookup: {
                from: "candidate_participate_masters",
                localField: "election_type_code",
                foreignField: "election_type_code",
                as: "candidates", 
                pipeline: [                
                    {
                        $lookup: {
                            from: "candidate_masters",
                            localField: "candidate_code",
                            foreignField: "candidate_code",
                            as: "candidate_info"
                        },
                    },
                    {
                        $match:{
                           "constitution_code": consti_code
                        }
                    },
                    {
                        $unwind: "$candidate_info"
                    },
                    {
                        $project: {
                            _id: 0,
                            candidate_name: "$candidate_info.candidate_name",
                            candidate_code: "$candidate_info.candidate_code",
                            symbol: "$candidate_info.symbol",
                            manifisto: "$candidate_info.manifisto",
                            state_code: "$state_code",
                            constitution_code: "$constitution_code",
                            election_type_code: "$election_type_code",
                            party_name: "$candidate_info.party_name"
                        }
                    }
                ],
            }
        }]).exec(function ( e, data ) { 
            res.send(data);
        });    
        // Participate.aggregate([
        //        {
        //             $lookup: {
        //                 from: "candidate_masters",
        //                 localField: "candidate_code",
        //                 foreignField: "candidate_code",
        //                 as: "candidate_info"
        //             },
        //         },
        //         {    
        //             $lookup:{
        //                 from: "election_type_masters",
        //                 localField: "election_type_code",
        //                 foreignField: "election_type_code",
        //                 as: "election_info"
        //             }
        //         },
        //         {    
        //             $lookup:{
        //                 from: "state_masters",
        //                 localField: "state_code",
        //                 foreignField: "state_code",
        //                 as: "state_info"
        //             }
        //         },
        //         // {
        //         //     $unwind: "$candidate_info"
        //         // },
        //     //     {
        //     //         $project: {
        //     //            _id: 0,
        //     //            candidate_name: "$candidate_info.candidate_name",
        //     //            symbol: "$candidate_info.symbol",
        //     //            manifisto: "$candidate_info.manifisto",
        //     //            state_code: "$state_code",
        //     //            constitution_code: "$constitution_code",
        //     //            election_type_code: "$election_type_code",
        //     //            party_name: "$candidate_info.party_name"
        //     //         }
        //     //    }
        // ]).exec(function ( e, data ) {
        //     // console.log('d', data);
        //     // console.log('e', e)
        //     res.send(data);
        // });
        
        
        // aggregate([
        //     { 
        //         $match : { "election_type_code" : election_type_code }, 
        //         $lookup: {
        //             from: ElectionType,
        //             localField: election_type_code,
        //             foreignField: election_type_code,
        //             as: result
        //         }
        //     }
        // ]).exec(function ( e, data ) {
        //     console.log('d', data);
        //     console.log('e', e)
        //     res.send(data);
        // });// }).catch(err => {
        //     res.status(500).send({ message: "Error retrieving Participate with id=" + id });
        // });

        // Participate.find(condition).then(data => {
        //     if (!data){
        //         res.status(404).send({ message: "Not found Participate with id " + id });
        //     } else {
        //         var retarr =[];
        //         for(var key in data) {
        //             console.log('data', data[key])
        //             const participate = data[key];

        //             var state=[];
        //             var candidate=[];
        //             var constitution=[];
                     
                    
        //             // Candidatemaster.find({candidate_code:participate.candidate_code}).then(data2 => {
        //             //     //console.log('data2', data2);
        //             //      candidate = data2[0];
        //             // });

        //             Constitution.find({constitution_code:participate.constitution_code}).then(data3 => {
        //                 //console.log('data3', data3);
        //                  constitution =data3[0];
        //             });
        //             Statemaster.find({state_code:participate.state_code}).then(data1 => { 
        //                 state = data1[0]; 
        //                 // state.join({
        //                 //     'constitution':constitution 
        //                 // })
        //             });

        //             console.log('state', state);
        //             retarr.push(state)
        //         } 
        //         res.send(data);
        //     } 
        // }).catch(err => {
        //     res.status(500).send({ message: "Error retrieving Participate with id=" + id });
        // });
  }
};
 
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Participate.findById(id).then(data => {
        if (!data)
            res.status(404).send({ message: "Not found Participate with id " + id });
        else res.send(data);
    }).catch(err => {
            res.status(500).send({ message: "Error retrieving Participate with id=" + id });
    });
};
 
exports.findparticipatedetail = (req, res) => {
    
    
    if (!req.body.election_type_code || !req.body.constitution_code) {
        res.status(400).send({ status:"error",message: "electionTypeCode and electionTypeName fields are missing!" });
        return;
    }else{

        const election_type_code = req.body.election_type_code;
        const constitution_code = req.body.constitution_code;
        var condition = { election_type_code: election_type_code,  constitution_code: constitution_code };

        Participate.find({condition}).then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Participate with id " + id });
            else res.send(data);
        }).catch(err => {
            res.status(500).send({ message: "Error retrieving Participate with id=" + id });
        });
    }
};

 
exports.update = (req, res) => {
  
}; 

exports.delete = (req, res) => {
  
};
 
exports.deleteAll = (req, res) => {
  
};
 