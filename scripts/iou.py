#https://stackoverflow.com/questions/44797713/calculate-the-area-of-intersection-of-two-rotated-rectangles-in-python

import shapely.geometry
import shapely.affinity
import numpy as np
import json


class RotatedRect:

    def __init__(self, cx, cy, w, h, angle):
        self.cx = cx
        self.cy = cy
        self.w = w
        self.h = h
        self.angle = angle

    def get_contour(self):
        w = self.w
        h = self.h
        c = shapely.geometry.box(-w / 2.0, -h / 2.0, w / 2.0, h / 2.0)
        rc = shapely.affinity.rotate(c, self.angle)
        return shapely.affinity.translate(rc, self.cx, self.cy)

    def intersection(self, other):
        return self.get_contour().intersection(other.get_contour())


with open('./referenceJSON', 'r') as file:
    ref_data = file.read()

ref_object = json.loads(ref_data)

with open('./no_keyframe', 'r') as file:
    test_data = file.read()

test_object = json.loads(test_data)

i = 0
iou_array = []
global_min = 1
global_max = 0
for frame in ref_object:
    test_frame = test_object[i]
    i += 1
    for label in frame:
        max_iou = 0
        ref_rect = RotatedRect(label[0], label[1], label[2], label[3], label[4])

        for test_label in test_frame:
            test_rect = RotatedRect(test_label[0], test_label[1], test_label[2],
                                    test_label[3], test_label[4])

            iou = ref_rect.intersection(test_rect).area / (
                ref_rect.get_contour().union(test_rect.get_contour()).area)

            if iou > max_iou:
                max_iou = iou

            if iou > global_max:
                global_max = iou

            if iou < global_min:
                global_min = iou

        iou_array.append(max_iou)
        print(max_iou, i)

print("AVERAGE IOU", np.mean(np.array(iou_array)))
print("MAX", global_max)
print("MIN", global_min)

r1 = RotatedRect(10, 15, 15, 10, 30)
r2 = RotatedRect(15, 15, 20, 10, 0)
