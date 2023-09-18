# Music_Scrapper
Application that get audio from website

#Problem
- Audio tag doesnt work because server get image type from src attribute rather than audio file
- Need to disable csrf on backend because even after allowing everything, it still denies request from frontend

#Keynotes
- Need function in function to make async function works on react
- Need to use Hook to make sure the code doesnt execute infinitely because re rendering
