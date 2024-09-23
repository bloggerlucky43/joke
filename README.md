import axios from 'axios'
import express from 'express'

app.set('views','backend')
app.set('view engine', 'ejs')
app.use(express.static(public))
