
setwd("/home/rushikesh/Portfolio/website/magic-portfolio/public/images/projects/")

#Load File
library(readxl)
DF<- read_excel("Registered_Motor_Vehicles_in_India_1951-2013.xlsx", 
                                                           sheet = "values")

#Arrange the dataframe in required format
install.packages("tidyr")
library(tidyr)
Vehicle_composition <- DF %>% gather(Vehicle_Type,percent_share, PTWs:Others)

library(ggplot2)
#Define the axis for publication quality
axis.text<-element_text(face = "bold", color = "black", size = 14 )
axistitle.text <- element_text(face = "bold", color = "black", size = 14)
legendtitle.text <- element_text(face = "bold", color = "black", size = 14) 

#Define color palettes
cbPalette <- c("#999999", "#E69F00", "#56B4E9", "#009E73", "#F0E442", "#0072B2", "#D55E00", "#CC79A7")
PFpalette2=c("#d73027","#fc8d59","#fee090","#e0f3f8","#91bfdb","#4575b4")
install.packages('rcartocolor')
library(rcartocolor)
safe_Palette <- carto_pal(12, "Safe")
# For other color templates
install.packages('rcartocolor')
library(rcartocolor)
safe_Palette <- carto_pal(12, "Safe")
palette_OkabeIto_black <- c("#E69F00", "#56B4E9", "#009E73", "#F0E442", 
                            "#0072B2", "#D55E00", "#CC79A7", "#000000")

library(ggthemes)

##Plot the data
library(ggplot2)
ggplot(data = Vehicle_composition,aes(x=Year, y= percent_share, fill=Vehicle_Type) )+ 
  geom_area(colour="black", size=.2, alpha=.8)+
  theme_bw()+
 # scale_fill_brewer(palette = "Accent")+
  scale_fill_manual(values=safe_Palette)+ #color blind template
  labs(x='Year of measurement', y= 'Vehicle composition of the traffic stream', fill='Type of vehicle')+
  theme(legend.text = legendtitle.text, legend.title = legendtitle.text)+
  theme(legend.position = "bottom")+
  theme(axis.text.x = axis.text, axis.text.y = axis.text)+
  theme(axis.title = axistitle.text)+
  theme(axis.text.x = element_text(angle = 35, hjust = 1))+
  scale_x_continuous(limit = c(1951, 2016),breaks = seq(1951, 2016, 5))+
  scale_y_continuous(breaks = seq(0, 100, 20),labels=function(x){ paste0(x, "%") })
 # geom_text(data=Vehicle_composition, aes(x = Year, y = percent_share,
                                       # label = paste0(percent_share,"%")), size=4)
  

#Line Plot
ggplot(data = Vehicle_composition,aes(x=Year, y= percent_share) )+ 
  geom_line(aes(color=Vehicle_Type), size=1)+
  geom_point(aes(shape=Vehicle_Type, color=Vehicle_Type))+
  #theme_bw()+
  labs(x='Year of measurement', y= 'Percent share in traffic stream', fill='Type of vehicle')+
  theme(legend.text = legendtitle.text, legend.title = legendtitle.text)+
  theme(legend.position = "bottom")+
  theme(axis.text.x = axis.text, axis.text.y = axis.text)+
  theme(axis.title = axistitle.text)+
  theme(axis.text.x = element_text(angle = 30, hjust = 1))+
  scale_x_continuous(limit = c(1951, 2013),breaks = seq(1951, 2013, 10))+
  scale_y_continuous(breaks = seq(0, 100, 20))
#+geom_text(data=Vehicle_composition, aes(x = Year, y = percent_share,
#label = paste0(percent_share,"%")), size=4)

