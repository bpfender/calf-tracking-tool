import cv2 as cv

# NOTE frameskipping slows things down considerably


def hamming_distance(hash1, hash2):
    d = 0
    comp = hash1 ^ hash2
    for elem in comp[0]:
        # http://www.valuedlessons.com/2009/01/popcount-in-python-with-benchmarks.html
        # Consideratios on popcount and hamming weight
        d += bin(elem).count("1")

    return d


cap = cv.VideoCapture("./test.webm")

prev_hash = None
count = 0

while cap.isOpened():
    ret, frame = cap.read()

    if not ret:
        print("Can't receive frame (stream end?). Exiting ...")
        break

    curr_hash = cv.img_hash.pHash(frame)

    if prev_hash is not None:
        if (hamming_distance(prev_hash, curr_hash) > 6):
            count += 1
            print([cap.get(cv.CAP_PROP_POS_FRAMES), count])
            prev_hash = curr_hash

            cv.imshow('frame', frame)
            if cv.waitKey(50) == ord('q'):
                break

        else:
            frame = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)

    else:
        prev_hash = curr_hash
        frame_Id = cap.get(cv.CAP_PROP_POS_FRAMES)
        print(frame_Id)

cap.release()
cv.destroyAllWindows()
