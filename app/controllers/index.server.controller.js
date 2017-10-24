exports.render = function(req,res) {
    res.render('index', {
        title : '아키텍처팀 회의록',
        user : JSON.stringify(req.user)
    });
};
