app.use(cors({
    origin: 'http://localhost:3000 ', 
    methods: ['GET', 'POST'], 
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify which headers are allowed
  }));
  