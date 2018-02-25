# Driving a Virtual Bike with the Microbit

Here is a method of riding and controllling a bike through the use of a microbit and machine learning.

## Disclaimer


## Developers
Jonathan Fermin, Robert Perez, Kushal Joshi

## Goals
The goal here was to integrate the use of the accelerometer in the microbit during the riding of a bike. 
Using the example code from wekinator, we used the accelerometer data from the microbit to control the use and direction of a bike in a 2d space. Eventually, the idea would be to control something in 3d space. 

## Tools

Microbit

[Microbit](https://www.microsoft.com/en-gb/download/details.aspx?id=40278)

[Processing](https://www.microsoft.com/en-gb/download/details.aspx?id=40276)

[Oscpacket 1.1.0](https://code.google.com/archive/p/oscpack)

Skeleton Basics D2D (from the Microsoft Developer Toolkit)

Wekinator

Processing


## Approach

### Sensors used

Everything is done through Kinect v1, connected to the computer through the USB converted extension cable.

### Feature extractor approach

For the feature extractor, we simplified the skeletal output down to two joints - the head and hand. The only three OSC messages sent to Wekinator were the distance between the hand and head in x, y, and z. This allowed us to make the project much more streamlined, and most importantly allows you to control it the same way regardless of where you are standing relative to the kinect. As long as your hand is in the correct location relative to the position of your head, it will act very consistently.


### ML model structure - what you did and why, including results from experiments you tried along the way

Our Wekinator setup dealt with the inputs creatively, in order to increase the project's success. The processing file listens for very specific combinations of OSC messages. There are 4 messages total. The first is whichMove, which is a category that decides which of the remaining 3 commands the user is trying to input. The last three are x, y, and z motion. These have two categories each (the 3rd category does nothing, it just made it simpler to populate wekinator with 3 categories for each output, since the first one had 3). The two categories for x,y, and z are simply direction of motion. First, the computer decides which command is most likely being used. Then, the computer decides which direction that command is going in, and changes the behavior of the car accordingly.

This ended up working quite well! Our initial test used K nearest neighbors, which was not very effective. You can see the results from this test in the first video below.

We ended up using a Support Vector Machine with the default settings for the final iteration. This was highly successful, and resulted in very predictable behavior! The KNN approach was too simplistic. SVM is a very good, all purpose choice for classification problems.

## Ideas about how other might improve upon your work

The movements aren't completely precise, and it can be annoying to control. Future work would improve on the accuracy of the system to your movements.

It's possible that different design choices might improve upon the system as well - we made a conscious decision not to change Wekinator's input table, so each command actually takes into account the x y and z of the hand position. Even though, for example, the x command only really needs to know about the x location, its behavior is still effected by the other dimensions so to use this you must move your hand very consistently. We took the approach that made sense to us for the application, but separating based on dimension may improve behavior.
Finally, our application could be improved by adding obstacles to navigate past, making the car simulation more like a game. If you hit an obstacle, you lose points.

Ultimately, we hope that technology similar to this could help people with lower back paralysis navigate in a wheelchair, or eventually, a car.

## A link to a demo video

[Intro and Initial Test](https://youtu.be/Tqz7L4BBuaE)

[Final working version](https://youtu.be/ppuT78cEfls)