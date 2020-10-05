# leaflet-challenge

# Leaflet Homework - Visualizing Data with Leaflet

## Background

Welcome to the United States Geological Survey, or USGS for short! The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. As a new hire, you will be helping them out with an exciting new project!

The USGS is interested in building a new set of tools that will allow them visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding..) on issues facing our planet.

Create a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.

[Map Result](map.png)

The resulting map takes data from all earthquakes over the last week with a magnitude over 1.0 and generates markers on the map where they occured. The radius of the marker is scaled relative to the magnitude of the earthquake where as the colour of the circle indicates the depth of the earthquake (a z-coordinate to latitude and longitude). The high end of the scale indicates earthquakes over 100 where as orange is the lowest at -20 and above. The scale goes up in intervals of 20. 
