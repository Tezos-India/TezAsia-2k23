parameter unit;
storage (map address int);
code {
    CAR;
    PUSH int 6;
    DIP { CDR };
    PUSH int 1;
    ADD;
    DIP { CDR };
    PAIR;
    NIL operation;
    PAIR;
}
