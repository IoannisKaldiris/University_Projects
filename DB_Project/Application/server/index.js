const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
const filmRouter = require('./routes/film.routes');
const seriesRouter = require('./routes/series.routes');
const customerRouter = require('./routes/customer.routes');
const employeeRouter = require('./routes/employee.routes');
const adminRouter = require('./routes/admin.routes');
const globalRouter = require('./routes/global.routes');

app.use('/api/films', filmRouter);
app.use('/api/series', seriesRouter);
app.use('/api/customer', customerRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/admin', adminRouter);
app.use('/api/global', globalRouter);

app.listen(process.env.PORT || 3001, () => {
  console.log('=================================');
  console.log('Server online');
});
