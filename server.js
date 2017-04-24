/**
 * Created by juan on 23/04/17.
 */

var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose');
    morgan = require('morgan');

var config = require('./app/config');

mongoose.Promise = global.Promise;

/**Connection to local MongoDB**/
mongoose.connect(config.database, function (err) {
    if (err) throw err;
    console.log('Connected to Database');
});

/**Middlewares**/
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/**Morgan to log requests to the console**/
app.use(morgan('dev'));

/** Import Models and controllers**/
var studentModel = require('./app/models/StudentModel')(app, mongoose);
var subjectModel = require('./app/models/SubjectModel')(app, mongoose);
var ctrl = require('./app/controller');

app.use(express.static(__dirname + '/www'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token");
    next();
});

/****************/
/** API routes **/
/****************/

var apiRoutes = express.Router();

/*** STUDENTS ***/

apiRoutes.route('/students')
    .get(ctrl.getStudent)
    .post(ctrl.setStudent);
apiRoutes.route('/studentsbyname')
    .get(ctrl.getStudentOrderByName);
apiRoutes.route('/studentsbysubject/:id')
    .get(ctrl.getStudentBySubject);
apiRoutes.route('/students/name/:name')
    .get(ctrl.filterStudentbyName);
apiRoutes.route('/students/:id')
    .get(ctrl.findStudentById)
    .delete (ctrl.removeStudent)
    .post(ctrl.setPhone)
    .put(ctrl.updateStudent);
apiRoutes.route('/students/:id/:phone_id')
    .delete(ctrl.removePhone);

/*** SUBJECTS ***/

apiRoutes.route('/subjects')
    .get(ctrl.getSubjects)
    .post(ctrl.setSubject);
apiRoutes.route('/subjects/:id')
    .get(ctrl.findSubjectById)
    .delete(ctrl.removeSubject)
    .put(ctrl.updateSubject);
apiRoutes.route('/subjects/name/:name')
    .get(ctrl.filterSubjectbyName);
apiRoutes.route('/subjects/period/:periode')
    .get(ctrl.filterSubjectbyPeriod);
apiRoutes.route('/subjects/:id/student')
    .post(ctrl.addStudentToSubject);
apiRoutes.route('/subjects/:id/student/:student_id')
    .delete(ctrl.removeStudentFromSubject);

app.use('/api', apiRoutes);

/**Start server**/
app.listen(config.port, function () {
    console.log("Node server running on http://localhost:" + config.port);
});
