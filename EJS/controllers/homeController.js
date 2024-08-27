const homeController = (req,res) =>{
    res.render('index',data = {
        'name' : 'G4'
    } );
}

module.exports = homeController