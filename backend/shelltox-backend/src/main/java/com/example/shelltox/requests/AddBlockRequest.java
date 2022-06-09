package com.example.shelltox.requests;

import lombok.Data;

@Data
public class AddBlockRequest {
    Long id;
    Long blocker;
    Long blockee;
}
