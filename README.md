https://music-scrapper.vercel.app/
# Music_Scrapper

Application that get audio from website

# How to Use
- Install the requirement
 backend
```batch
pip install -r requirements.txt
```
 
 frontend
```batch
node install
```
- Run the backend and frontend
  (backend)
```batch
python manage.py runserver
```
  (Frontend)
```batch
npm run dev
```

# Problem

- Audio tag doesnt work because server send get image type from src attribute rather than audio file(SOLVED)
- Need to disable csrf on backend because even after allowing everything, it still denies request from frontend

# Keynotes

- Need function in function to make async function works on react
- Need to use Hook to make sure the code doesnt execute infinitely because re rendering
