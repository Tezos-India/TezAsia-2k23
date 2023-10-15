#import modules
import random
import cv2
import cvzone
from cvzone.HandTrackingModule import HandDetector
import time

cap = cv2.VideoCapture(0)#capture the webcam
#deafault size of webcam
cap.set(3, 640)
cap.set(4, 480)

detector = HandDetector(maxHands=1)#detect hands

timer = 0
stateResult = False
startGame = False
scores = [0, 0]  # [AI, Player]

while True:
    imgBG = cv2.imread("resources/BG.png")
    success, img = cap.read()

    imgScaled = cv2.resize(img, (0, 0), None, 0.875, 0.875)#webcam scaled in the size per the background image
    imgScaled = imgScaled[:, 80:480]

    hands, img = detector.findHands(imgScaled)  #detect hand which is coded before display image otherwise handdetect can't work. 

   #coded in loop
    if startGame:

        if stateResult is False:
            timer = time.time() - initialTime
            cv2.putText(imgBG, str(int(timer)), (605, 435), cv2.FONT_HERSHEY_PLAIN, 6, (255, 0, 255), 4)

            if timer > 3:
                stateResult = True
                timer = 0

                if hands:
                    playerMove = None
                    hand = hands[0]
                    fingers = detector.fingersUp(hand)
                    if fingers == [0, 0, 0, 0, 0]:
                        playerMove = 1
                    if fingers == [1, 1, 1, 1, 1]:
                        playerMove = 2
                    if fingers == [0, 1, 1, 0, 0]:
                        playerMove = 3

                    randomNumber = random.randint(1, 3)
                    imgAI = cv2.imread(f'resources/{randomNumber}.png', cv2.IMREAD_UNCHANGED)
                    imgBG = cvzone.overlayPNG(imgBG, imgAI, (149, 310))

                    # Player Wins
                    if (playerMove == 1 and randomNumber == 3) or \
                            (playerMove == 2 and randomNumber == 1) or \
                            (playerMove == 3 and randomNumber == 2):
                        scores[1] += 1

                    # AI Wins
                    if (playerMove == 3 and randomNumber == 1) or \
                            (playerMove == 1 and randomNumber == 2) or \
                            (playerMove == 2 and randomNumber == 3):
                        scores[0] += 1

    imgBG[234:654, 795:1195] = imgScaled

    if stateResult:
        imgBG = cvzone.overlayPNG(imgBG, imgAI, (149, 310))
    
    #score print at the particular axis
    cv2.putText(imgBG, str(scores[0]), (410, 215), cv2.FONT_HERSHEY_PLAIN, 4, (255, 255, 255), 6)
    cv2.putText(imgBG, str(scores[1]), (1112, 215), cv2.FONT_HERSHEY_PLAIN, 4, (255, 255, 255), 6)

    # if scores[0] == 5 :
    #  cv2.putText(imgBG,"AI WIN" ,(527,156),cv2.FONT_HERSHEY_PLAIN,4,(255,0,0),6 )
    #  cv2.waitKey(5000)
    #  break
      
    # if scores[1] == 5: 
    #  cv2.putText(imgBG,"PLAYER WIN",(527,156),cv2.FONT_HERSHEY_PLAIN,4,(255,0,0),6)
    #  cv2.waitKey(5000)
    #  break

    cv2.imshow("BG", imgBG)

    key = cv2.waitKey(1)
    if key == ord('s'):#start the game when user enter the key 's'
        startGame = True
        initialTime = time.time()
        stateResult = False
  
